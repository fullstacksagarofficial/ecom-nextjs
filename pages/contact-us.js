import React,{useState}  from 'react'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const ContactUs = () => {
    const [contactName, setcontactName] = useState('');
    const [contactEmail, setcontactEmail] = useState('');
    const [contactMessage, setcontactMessage] = useState('');

    const handlechange = (e) => {
     if (e.target.name == "contactName") {
        setcontactName(e.target.value);
      } 
     else if (e.target.name == "contactEmail") {
        setcontactEmail(e.target.value);
      } 
     else if (e.target.name == "contactMessage") {
        setcontactMessage(e.target.value);
      } 
    };
  
    const handlesubmit = async (e) => {
      e.preventDefault();
      const data = {contactName, contactEmail, contactMessage };
      let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      let response = await res.json();
      // console.log(response);
      if(response.success == "True"){
        toast.success("Message has been sent successfully ! Our team will contact you shortly", {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
      else  if(response.error == "False"){
        toast.error("Something went wrong !", {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
      setcontactName("");
      setcontactEmail("");
      setcontactMessage("");
    };
  return (
   <>
   <section className="text-gray-600 body-font relative">
  <div className="container px-5 py-24 mx-auto flex sm:flex-nowrap flex-wrap">
    <div className="lg:w-2/3 md:w-1/2 bg-gray-300 rounded-lg overflow-hidden sm:mr-10 p-10 flex items-end justify-start relative">
      <iframe width="100%" height="100%" className="absolute inset-0" frameBorder="0" title="map" marginHeight="0" marginWidth="0" scrolling="no" src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d111680.11750569296!2d77.6989603!3d28.9872622!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x6e64bbcec97811bc!2sAtechSeva!5e0!3m2!1sen!2sin!4v1657539885288!5m2!1sen!2sin"></iframe>
      <div className="bg-white relative flex flex-wrap py-6 rounded shadow-md w-auto">
        <div className="lg:w-1/3 px-6">
          <h2 className="title-font font-semibold text-gray-900 tracking-widest text-xs">ADDRESS</h2>
          <p className="mt-1">Meerut, Uttar Pradesh</p>
        </div>
        <div className="lg:w-1/2 px-6 mt-4 lg:mt-0">
          <h2 className="title-font font-semibold text-gray-900 tracking-widest text-xs">EMAIL</h2>
          <a className="text-gray-500 leading-relaxed">developer.sagar10@gmail.com</a>
          <h2 className="title-font font-semibold text-gray-900 tracking-widest text-xs mt-4">PHONE</h2>
          <p className="leading-relaxed">7017742830</p>
        </div>
      </div>
    </div>
    <div className="lg:w-1/3 md:w-1/2 bg-white flex flex-col md:ml-auto w-full md:py-8 mt-8 md:mt-0">
      <h2 className="text-gray-900 text-xl mb-1 font-medium title-font">Contact Us</h2>
      <p className="leading-relaxed mb-5 text-gray-600">Feel free and friendly to contact us !</p>
      <form method='POST' onSubmit={handlesubmit}>
      <div className="relative mb-4">
        <label htmlFor="name" className="leading-7 text-sm text-gray-600">Name</label>
        <input  type="text"
                    id="contactName"
                    name="contactName"
                    onChange={handlechange}
                    value={contactName}
                    className="w-full bg-white rounded border border-gray-300 focus:border-gray-500 focus:ring-2 focus:ring-gray-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
      </div>
      <div className="relative mb-4">
        <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
        <input   id="contactEmail"
                    name="contactEmail"
                    onChange={handlechange}
                    value={contactEmail} className="w-full bg-white rounded border border-gray-300 focus:border-gray-500 focus:ring-2 focus:ring-gray-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
      </div>
      <div className="relative mb-4">
        <label htmlFor="message" className="leading-7 text-sm text-gray-600">Message</label>
        <textarea   id="contactMessage"
                    name="contactMessage"
                    onChange={handlechange}
                    value={contactMessage} className="w-full bg-white rounded border border-gray-300 focus:border-gray-500 focus:ring-2 focus:ring-gray-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"></textarea>
      </div>
      <button type='submit' className="text-white bg-gray-700 border-0 py-2 px-6 focus:outline-none hover:bg-gray-600 rounded text-lg">Submit</button>
      </form>
    </div>
  </div>
</section>
   </>
  )
}

export default ContactUs