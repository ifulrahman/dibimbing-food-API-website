import { useState } from 'react';
import axios from 'axios';
import { setCookie } from 'cookies-next';
import { useRouter } from 'next/router';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://api-bootcamp.do.dibimbing.id/api/v1/login', 
        { email, password }, 
        { 
          headers: {
            'Content-Type': 'application/json',
            'apiKey': 'w05KkI9AWhKxzvPFtXotUva-' 
          }
        }
      );
      const { token } = res.data;
      setCookie('token', token);
      router.push('/'); 
    } catch (error) {
      alert('Login gagal: ' + error.response.data.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen font-serif">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h1 className="mb-4 text-2xl font-bold text-center">Hello!</h1>
        <p className="mb-8 text-center text-gray-600">Sign Up to Get Started</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
              required
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 text-white transition duration-200 bg-red-500 rounded-lg hover:bg-red-700"
          >
            Submit
          </button>
        </form>
        <p className="mt-10 italic text-center text-gray-600">Muhammad Syaiful Rahman</p>
        <p className="mt-2 italic text-center text-gray-600">Assignment Next.js</p>
      </div>
    </div>
  );
}