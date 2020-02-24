import React, { useState, useEffect } from 'react';
import FibForm from '../components/FibForm/FibForm';
import FibRequestInfo from '../components/FibRequestInfo/FibRequestInfo';
import FibList from '../components/FibList/FibList';
import axios from 'axios';
function Home() {
  const [state, setState] = useState({
    seenIndexes: [],
    values: {},
    index: '',
    fetch: true
  });

  useEffect(() => {
    (async function() {
      if (state.fetch) {
        const values = await (await axios.get('/api/values/current')).data;
        const seenIndexes = await (await axios.get('/api/values/all')).data;
        setState({
          ...state,
          values,
          seenIndexes,
          fetch: false
        });
      }
    })();
  }, [state]);

  const submitHandler = async value => {
    const index = value.value;
    await axios.post('/api/values', { index });
    const values = await axios.get('/api/values/current').data;
    const seenIndexes = [...state.seenIndexes, index];
    setState({ ...state, values, seenIndexes, fetch: true });
  };
  return (
    <React.Fragment>
      <h1 className='banner'>Fibnacci Calculator version 2</h1>
      <div className='container'>
        <FibForm submitValue={submitHandler} />
        <FibRequestInfo values={state.seenIndexes} />
        <FibList values={state.values} />
      </div>
    </React.Fragment>
  );
}

export default Home;
