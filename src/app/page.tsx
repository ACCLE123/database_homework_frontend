import { Suspense } from 'react';
import Link from 'next/link';

async function getData() {
  const res = await fetch('http://localhost:8080/api/students', {
    method: 'GET',
    headers: {
      'Cache-Control': 'no-cache',
      'Pragma': 'no-cache',
      'Expires': '0',
    },
  });
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
}

async function StudentList() {
  // Wait for the students
  const data = await getData();

  return (
    <ul style={styles.list}>
      {data.data.map((student: { id: number; name: string }) => (
        <li key={student.id} style={styles.listItem}>
          <Link href={`/student/${student.id}`}>{student.name}</Link>
        </li>

      ))}
    </ul>

  );
}

export default function Home() {
  return (
    <main style={styles.main}>
      <h1 style={styles.title}>Student List</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <StudentList />
      </Suspense>
    </main>
  );
}

const styles = {
  main: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    padding: '2rem',
  },
  title: {
    fontSize: '2rem',
    marginBottom: '1rem',
  },
  list: {
    listStyleType: 'none',
    padding: 0,
    margin: 0,
    width: '100%',
    maxWidth: '600px',
  },
  listItem: {
    padding: '1rem',
    margin: '0.5rem 0',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    border: '1px solid white',
  },
};
