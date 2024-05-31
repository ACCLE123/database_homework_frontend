import { Suspense } from 'react';

async function getCourse(id: number) {
    const res = await fetch(`http://localhost:8080/api/studentCourses/${id}`, {
        method: 'GET',
        headers: {
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache',
            'Expires': '0',
        },
    });

    if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Failed to fetch data: ${res.statusText} - ${errorText}`);
    }
    return res.json();
}

function formatTime(hour: number, minute: number) {
    const h = hour < 10 ? `0${hour}` : hour;
    const m = minute < 10 ? `0${minute}` : minute;
    return `${h}:${m}`;
}

function getWeekdayName(weekday: number) {
    const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    return weekdays[weekday];
}

async function CourseList({ id }: { id: number }) {
    const data = await getCourse(id);

    return (
        <ul style={styles.list}>
            {data.data.map((course: { id: number; name: string; startHour: number; startMinute: number; endHour: number; endMinute: number; weekday: number }) => (
                <li key={course.id} style={styles.listItem}>
                    <div style={styles.courseName}>{course.name}</div>
                    <div style={styles.courseTime}>
                        {getWeekdayName(course.weekday)}: {formatTime(course.startHour, course.startMinute)} - {formatTime(course.endHour, course.endMinute)}
                    </div>
                </li>
            ))}
        </ul>
    );
}

export default function Page({ params }: { params: { studentId: number } }) {
    return (
        <main style={styles.main}>
            <h1 style={styles.title}>Course List</h1>
            <Suspense fallback={<div>Loading...</div>}>
                <CourseList id={params.studentId} />
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
        display: 'flex',
        flexDirection: 'column',
    },
    courseName: {
        fontSize: '1.2rem',
        fontWeight: 'bold',
    },
    courseTime: {
        fontSize: '1rem',
        color: 'grey',
    },
};
