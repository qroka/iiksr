import { NextPage } from 'next';

const Home: NextPage = () => {
  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-bold text-blue-600">Сургутский район</h1>
      <p className="mt-4 text-lg">
        Добро пожаловать на портал о Сургутском районе!
      </p>
    </main>
  );
};

export default Home;
