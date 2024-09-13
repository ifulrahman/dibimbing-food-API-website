import axios from 'axios';
import { getCookie } from 'cookies-next';
import { useEffect, useState } from 'react';

export default function Home({ foods }) {
  return (
    <div className="min-h-screen">
      <h1 className="my-6 font-serif text-3xl font-bold text-center">List Menu</h1>
      <div className="grid grid-cols-1 gap-6 px-6 sm:grid-cols-2 md:grid-cols-3">
        {foods.map(food => (
         <div key={food.id} className="overflow-hidden transition-shadow duration-300 bg-white rounded-lg shadow-lg hover:shadow-2xl">
          <div className="relative rounded-t-lg">
            <div className="absolute inset-0 rounded-t-lg bg-gradient-to-t from-white to-transparent"></div>
            <img
             src={food.imageUrl}
             alt={food.name}
             className="object-cover w-full h-48 rounded-t-lg"
           />
          </div>
          <div className="p-4">
           <h3 className="flex items-center justify-center mt-2 font-serif text-lg text-gray-700">{food.name}</h3>
           <a href={`/idMakanan/${food.id}`}>
             <div className="flex justify-center">
               <button className="w-1/2 py-2 mt-4 font-serif text-white transition bg-red-500 rounded-full hover:bg-red-600">
                 Details
               </button>
             </div>
           </a>
          </div>
         </div>
        ))}
      </div>
    </div>
  );
}

export async function getServerSideProps({ req, res }) {
  const token = getCookie('token', { req, res });
  if (!token) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  const foodRes = await axios.get('https://api-bootcamp.do.dibimbing.id/api/v1/foods', {
    headers: {
      'Content-Type': 'application/json',
      'apiKey': 'w05KkI9AWhKxzvPFtXotUva-',
      'Authorization': `Bearer ${token}`,
    }
  });
  const foods = foodRes.data.data;

  return {
    props: { foods },
  };
}
