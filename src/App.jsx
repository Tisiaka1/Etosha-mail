import { useState } from 'react'

import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false);
    

  const test = () => {
    console.log('API KEY:', import.meta.env.VITE_MAILLITE_API_KEY);
    console.log('GROUP ID:', import.meta.env.VITE_MAILLITE_GROUP_ID);
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    setEmail('');
    setName('');
   


//Api call to MailLite
    try {
 
      const url = `https://connect.mailerlite.com/api/subscribers`;
      
      const requestBody = {
        email: email,
        groups: [import.meta.env.VITE_MAILLITE_GROUP_ID],
        status: 'active',
        fields: {
          name: name
        }
      };

    
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_MAILLITE_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        setStatus('success');
        setEmail('');
        setName('');
      } else {
        const errorData = await response.json();
        if (errorData.message && errorData.message.includes('already exists')) {
          setStatus('already-subscribed');
        } else {
          setStatus('error');
        }
      }
    } catch (error) {
      console.error('MailLite signup error:', error);
      setStatus('error');
    } finally {
      setIsLoading(false);
    }

console.log('API KEY:', import.meta.env.VITE_MAILLITE_API_KEY);
console.log('GROUP ID:', import.meta.env.VITE_MAILLITE_GROUP_ID);
  };

  return (

  

    <div>

    <div className='Etosha-Header'>
    <h1>Etosha</h1>
    <p>We unify maintenance requests for solo landlords</p>
    
    </div>
    

    
    

     <div className='Etosha-container'> 
     


        <div className='Container-card'>

        <form onSubmit={handleSubmit} method='POST'>

    <label htmlFor='name' >Name</label> <br></br>
        <input type='text' placeholder='John Doe' required  onChange={(e) => setName(e.target.value)}/> <br></br>
    <label htmlFor='email'>Email</label> <br></br>
        <input type='email' placeholder='JohnDoe@Gmail.com' required onChange={(e)=>setEmail(e.target.value)} />
<br></br>
        <button type='submit'>Submit</button>
       
        <p> {status}</p>

        </form>

        

        </div>
     </div>
    </div>
  )
}

export default App
