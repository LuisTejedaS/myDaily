'use client'
import { useState, useEffect } from 'react';
import styles from '../../styles/Home.module.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Link from 'next/link';
import { useRouter } from 'next/navigation'


const NewDaily = (props: any) => {
  const router = useRouter()
  const [newUserInput, setNewUserInput] = useState('');
  const [chatIsLoading, setChatIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [dailyId, setDailyId] = useState(props.dailyId);

  useEffect(() => {
    if (dailyId) {
      fetch(`/api/daily/${dailyId}`)
        .then((res) => res.json())
        .then((data) => {
          setDailyId(data.id)
          setStartDate(new Date(Date.parse(data.date)))
          setNewUserInput(data.content)
          setChatIsLoading(false)
        })
    }
  }, [])

  const handleClearDaily = () => {
    setNewUserInput("");
  }

  const handleSaveDaily = async () => {

    if (newUserInput.trim() === '' || chatIsLoading) return;
    setNewUserInput('');
    setChatIsLoading(true);

    const method = dailyId === 0 ? "POST" : "PUT"

    const options = {
      method: method,
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        newDaily: newUserInput,
        date: {
          month: startDate.getMonth(),
          day: startDate.getDate(),
          year: startDate.getFullYear()
        },
        id: dailyId
      })
    }
    const url = '/api/daily';

    try {
      const response = await fetch(url, options);
      const data = response.status
      if (data !== 200) {
        setIsError(true);
      }
      setChatIsLoading(false);
      router.push('/')
    }
    catch (error) {
      console.error('Error fetching data:', error);
      setChatIsLoading(false);
    }
    setChatIsLoading(false);
  };

  const handleDeleteDaily = async () => {

    if (chatIsLoading || dailyId === 0) return;
    setNewUserInput('');
    setChatIsLoading(true);

    const method = "DELETE";
    const url = `/api/daily/${dailyId}`
    const options = {
      method: method,
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      }
    }

    try {
      const response = await fetch(url, options);
      const data = response.status
      setChatIsLoading(false);
      if (data !== 200) {
        setIsError(true);
      } else {
        router.push('/')
      }
    }
    catch (error) {
      console.error('Error deleting data:', error);
      setChatIsLoading(false);
      setIsError(true)
    }
    setChatIsLoading(false);
  };

  return (
    <div className={styles.dailyContainer}>
      <div className={styles.title}>Save the daily</div>
      <div className={styles.dailyContainer}>
        <div className={styles.dailyEntry}>
          <DatePicker selected={startDate} onChange={(date) => date && setStartDate(date)} />
          <textarea
            id="user-input"
            className={styles.userInput}
            placeholder={chatIsLoading ? "Thinking" : "Please enter your daily"}
            value={newUserInput}
            onChange={(e) => setNewUserInput(e.target.value)}
          ></textarea>
        </div>
      </div>
      <div className={isError === true ? `${styles.dailyControls} ${styles.dailyControlsError}` : styles.dailyControls}>
        <button
          className={chatIsLoading || newUserInput === "" ? `${styles.primaryButton} ${styles.disabled}` : styles.primaryButton}
          disabled={chatIsLoading || newUserInput === ""}
          onClick={handleSaveDaily}
        >
          Save
        </button>
        <button className={styles.primaryButton}
          onClick={handleClearDaily}
        >
          Clear Entry
        </button>
        <button className={chatIsLoading || dailyId === 0 ? `${styles.primaryButton} ${styles.disabled}` : styles.primaryButton}
          onClick={handleDeleteDaily}
          disabled={chatIsLoading || dailyId === 0}
        >
          Delete
        </button>
        <Link className={styles.primaryButton} href="/">return to dailies</Link>
      </div>
    </div>
  );
};
export default NewDaily;