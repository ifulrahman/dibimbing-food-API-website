import axios from 'axios';
import { getCookie } from 'cookies-next';
import { useRouter } from 'next/router';

export default function DetailMakanan({ food }) {
  const router = useRouter(); 

  const handleBack = () => {
    router.push('/');
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-10 font-sans bg-gray-50">
      <div className="max-w-2xl overflow-hidden bg-white rounded-lg shadow-lg"> 
        <div className="relative">
          <img
            src={food.imageUrl}
            alt={food.name}
            className="object-cover w-full h-96" 
          />
          <div className="absolute px-4 py-2 text-white bg-red-500 rounded-full text-md top-4 left-4">
            ⭐ {food.rating}
          </div>
        </div>

        <div className="p-8"> 
          <h1 className="text-xl font-bold text-gray-800">{food.name}</h1> 
          <p className="mt-4 text-lg text-gray-600">{food.description}</p> 
          <p className="mt-6 text-sm text-gray-500">
            Tanggal Dibuat: {new Date(food.createdAt).toLocaleDateString()}
          </p>

          <div className="mt-6">
            <button
              onClick={handleBack}
              className="py-2 text-lg text-white transition bg-red-500 rounded-full w-28 hover:bg-red-700"> 
              ⤶ Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps({ req, res, params }) {
  const token = getCookie('token', { req, res });
  if (!token) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  const foodRes = await axios.get(`https://api-bootcamp.do.dibimbing.id/api/v1/foods/${params.id}`, {
    headers: {
      'Content-Type': 'application/json',
      'apiKey': 'w05KkI9AWhKxzvPFtXotUva-',
      'Authorization': `Bearer ${token}`,
    }
  });
  const food = foodRes.data.data;

  return {
    props: { food },
  };
}