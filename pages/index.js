import Head from 'next/head';
import { useEffect } from 'react';
import NavBar from '../components/NavBar';
import HelpForm from '../components/helpForm';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Home | Submit a Request | Help & Support Network</title>
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
        <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyB3vvh7i0X7sL90CwT1gVBofb8DgRW6Al4&libraries=places"></script>
      </Head>
      <NavBar />
      <div className={styles.header}>
        <h1>
          Welcome to the{' '}
          <span className={styles.lineBreak}>Help and Support</span> Network
        </h1>
        <p>
          Fill out the form below to{' '}
          <span className={styles.lineBreak}>ask for help with anything!</span>
        </p>
      </div>
      <HelpForm />
      <footer className={styles.footer}>
        <p>&#169; 2020 Help & Support Network.</p>
      </footer>
    </div>
  );
}
