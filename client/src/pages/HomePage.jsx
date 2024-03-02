import { Footer, Possibility, Features, WhatGPT3, Header } from '../containers';
import { CTA, Navbar } from '../components';


function HomePage() {
  return (
    <div className="App">
      <div className="gradient__bg">
       <Navbar />
       <Header />
    </div>
      <WhatGPT3 />
      <Features />
      <Possibility />
      <CTA />
      <Footer />
  </div>
  
  );
}

export default HomePage;


