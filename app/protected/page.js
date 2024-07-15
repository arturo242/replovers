// app/protected/page.js
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ProtectedPage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      fetch('/api/verify-token', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
        .then(response => response.json())
        .then(data => {
          if (data.userId) {
            setUser(data);
          } else {
            router.push('/login');
          }
          setLoading(false);
        })
        .catch(() => {
          router.push('/login');
          setLoading(false);
        });
    } else {
      router.push('/login');
      setLoading(false);
    }
  }, [router]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Protected Page</h1>
      <p>Welcome, user {user.userId}!</p>
    </div>
  );
}
