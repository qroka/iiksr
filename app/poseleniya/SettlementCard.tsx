import React from 'react';

interface Props {
  flag_url: string;
  name: string;
  foundation_date: string;
  population: number;
  area: number;
  distance_to_khanty: number;
  distance_to_moscow: number;
  onBack: () => void;
}

export default function SettlementCard({
  flag_url,
  name,
  foundation_date,
  population,
  area,
  distance_to_khanty,
  distance_to_moscow,
}: Props) {
  return (
    <div style={{
      background: '#fff',
      borderRadius: 8,
      boxShadow: '0 2px 16px #0002',
      padding: 24,
      width: 340,
      fontFamily: 'ACTAY, sans-serif',
      position: 'relative',
      margin: 24,
    }}>
      <img src={flag_url} alt="Флаг" style={{ width: 150, height: 100, marginBottom: 30 }} />
      <div style={{ fontWeight: 700, fontSize: 24, color: '#03515c', marginBottom: 30 }}>{name}</div>
      <div style={{ color: '#757575', marginBottom: 30 }}>Дата основания: <b style={{ color: '#03515c' }}>{foundation_date}</b></div>
      <div style={{ color: '#757575', marginBottom: 30 }}>Площадь: <b style={{ color: '#03515c' }}>{area} км²</b></div>
      <div style={{ color: '#757575', marginBottom: 30 }}>До Ханты-Мансийска: <b style={{ color: '#03515c' }}>{distance_to_khanty} км</b></div>
      <div style={{ color: '#757575', marginBottom: 30 }}>Население: <b style={{ color: '#03515c' }}>{population.toLocaleString('ru-RU')} тыс. чел.</b></div>
      <div style={{ color: '#757575', marginBottom: 30 }}>До Москвы: <b style={{ color: '#03515c' }}>{distance_to_moscow} км</b></div>
      <button style={{
        width: '100%',
        background: '#B7261E',
        color: '#fff',
        border: 'none',
        borderRadius: 32,
        padding: '16px 0',
        fontSize: 18,
        fontWeight: 700,
        cursor: 'pointer',
        marginBottom: 16
      }}>
        УЗНАТЬ ПОДРОБНЕЕ
      </button>
    </div>
  );
} 