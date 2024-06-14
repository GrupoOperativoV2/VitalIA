import React from 'react'
import Experties from './Expo/components/Experties/Experties'
import Footer from './Expo/components/Footer/Footer'
import Header from './Expo/components/Header/Header'
import Hero from './Expo/components/Hero/Hero'
import People from './Expo/components/People/People'
import Portfolio from './Expo/components/Portfolio/Portfolio'
import Work from './Expo/components/Work/Work'
import css from './Expo/styles/App.module.scss'
import './Expo/styles/global.scss'
import './Expo/styles/index.css'
 
 function Expobatiz() {
 
    return (
        <div className={`bg-primary ${css.containerExpo}`}>
          <Header/>
          <Hero/>
          <Experties/>
          <Work/>
          <Portfolio/>
          <People/>
          <Footer/>
        </div>
      )
    }
    
export default Expobatiz;
