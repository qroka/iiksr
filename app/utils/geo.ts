// Простое преобразование географических координат (долгота/широта) -> пиксели изображения с помощью аффинного преобразования.
// Требуется минимум 3 контрольные точки: реальные lon/lat и пиксельные x/y на PNG.

export type GeoPoint = { lon: number; lat: number };
export type PixelPoint = { x: number; y: number };
export type ControlPoint = GeoPoint & PixelPoint;

export type AffineParams = {
  a: number; b: number; c: number;
  d: number; e: number; f: number;
};

/**
 * Подгонка аффинного преобразования, которое отображает (lon,lat) -> (x,y):
 * x = a*lon + b*lat + c
 * y = d*lon + e*lat + f
 */
export function fitAffine(controlPoints: ControlPoint[]): AffineParams {
  if (controlPoints.length < 3) {
    throw new Error("Need at least 3 control points to fit affine transform");
  }

  // Построение нормальных уравнений для метода наименьших квадратов: M^T M params = M^T v
  let S = new Array(6).fill(0).map(() => new Array(6).fill(0));
  let Tx = new Array(6).fill(0);
  let Ty = new Array(6).fill(0);

  for (const p of controlPoints) {
    const L = p.lon;
    const A = p.lat;
    const row = [L, A, 1, 0, 0, 0];
    const row2 = [0, 0, 0, L, A, 1];

    // Накопление S = sum(row^T row) блочно
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        S[i][j] += row[i] * row[j];
        S[i + 3][j + 3] += row2[i + 3] * row2[j + 3];
      }
    }

    // Перекрестные блоки равны нулю по построению

    // Накопление T = sum(row^T target)
    Tx[0] += row[0] * p.x; Tx[1] += row[1] * p.x; Tx[2] += row[2] * p.x;
    Ty[3] += row2[3] * p.y; Ty[4] += row2[4] * p.y; Ty[5] += row2[5] * p.y;
  }

  // Решаем две системы 3x3 независимо
  const axbx = solve3x3(
    [S[0][0], S[0][1], S[0][2], S[1][0], S[1][1], S[1][2], S[2][0], S[2][1], S[2][2]],
    [Tx[0], Tx[1], Tx[2]]
  );
  const dydf = solve3x3(
    [S[3][3], S[3][4], S[3][5], S[4][3], S[4][4], S[4][5], S[5][3], S[5][4], S[5][5]],
    [Ty[3], Ty[4], Ty[5]]
  );

  return { a: axbx[0], b: axbx[1], c: axbx[2], d: dydf[0], e: dydf[1], f: dydf[2] };
}

export function projectAffine(params: AffineParams, point: GeoPoint): PixelPoint {
  const x = params.a * point.lon + params.b * point.lat + params.c;
  const y = params.d * point.lon + params.e * point.lat + params.f;
  return { x, y };
}

function solve3x3(m: number[], v: number[]): number[] {
  // m - это 9 элементов в строчном порядке, v - длина 3
  const [a,b,c,d,e,f,g,h,i] = m;
  const det = a*(e*i - f*h) - b*(d*i - f*g) + c*(d*h - e*g);
  if (Math.abs(det) < 1e-12) {
    throw new Error("Singular matrix while solving 3x3");
  }
  const inv = [
    (e*i - f*h)/det, -(b*i - c*h)/det,  (b*f - c*e)/det,
    -(d*i - f*g)/det, (a*i - c*g)/det, -(a*f - c*d)/det,
    (d*h - e*g)/det, -(a*h - b*g)/det,  (a*e - b*d)/det,
  ];
  return [
    inv[0]*v[0] + inv[1]*v[1] + inv[2]*v[2],
    inv[3]*v[0] + inv[4]*v[1] + inv[5]*v[2],
    inv[6]*v[0] + inv[7]*v[1] + inv[8]*v[2],
  ];
}

/**
 * Вспомогательная функция для построения контрольных точек из известного соответствия городов.
 * realToPixel: { название -> { lon,lat,x,y } }
 */
export function buildControlPoints(map: Record<string, { lon: number; lat: number; x: number; y: number }>): ControlPoint[] {
  return Object.values(map);
}


