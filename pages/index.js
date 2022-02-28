import Head from 'next/head'
import { fetchRoutes } from '../helpers/data';
import NexTrip from './components/NexTrip';

export default function Home(props) {
  return (
    <div className='container'>
      <Head>
        <title>NextTrip</title>
        <meta name="description" content="NextTrip Target Case Study" />      
      </Head>
      <h1>Next Trip</h1>        
      <NexTrip routes={ props.routes } />        
    </div>
  )
}

export async function getStaticProps() {
  const defaultRoute = {
    label: "Select Route",
    value: "selectRoute"
  };
  const routes =[ defaultRoute, ... await fetchRoutes() ];
  return {
    props: {
      routes
    }
  }
}
