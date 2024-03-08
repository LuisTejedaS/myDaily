'use client'
import { useState, useEffect } from 'react'
import styles from '../../styles/Home.module.css';
import "react-datepicker/dist/react-datepicker.css";
import Link from 'next/link';


const AllDailies = () => {

  const [data, setData] = useState([])
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/daily')
      .then((res) => res.json())
      .then((data) => {
        setData(data)
        setLoading(false)
      })
  }, [])

  if (isLoading) return <p>Loading...</p>
  return (
    <div className={styles.dailyContainer}>
      <div className={styles.title}>All dailies</div>
      <div className={styles.dailyContainer}>
        <div className={styles.dailyControls}>
          <Link href="/daily">Create new daily</Link>
        </div>
        <div className={styles.dailiesContainer}>
          {data.map(function (data: { id: number, content: string, date: string }) {
            let date = new Date(data.date)
            return (
              <div className={styles.singleDailyContainer} key={data.id}>
                <Link href={`/daily/${data.id}`} >
                  <label>
                    Date:  {`${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`}
                  </label>
                </Link>
                <div>
                  <label className={styles.singleDailyContentLabel}>
                    content:
                  </label>
                  <textarea readOnly rows={7} className={styles.singleDailyContent} value={data.content}>
                  </textarea>
                </div>
              </div>
            )
          })}

        </div>
      </div>
    </div>
  );
};
export default AllDailies;