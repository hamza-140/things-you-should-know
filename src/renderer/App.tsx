import React, { useState, useEffect } from 'react';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import icon from '../../assets/icon.svg';
import './App.css';

import * as XLSX from 'xlsx';

const YourComponent = () => {
  const  [data, setData]  = useState([]);
  const  [currentIndex, setCurrentIndex ] = useState(0);

  // Sample data variable with multiple quotes separated
  const sampleData = ` "Always assume your code will fail, because it probably will." ,
     "Comment your code like you're explaining it to an idiot, because let's face it, most people won't understand it otherwise." ,
     "Don't reinvent the wheel unless you enjoy wasting time and looking like an amateur." ,
     "Learn to love debugging, because you'll be doing a lot of it." ,
     "Never trust user input, because users are about as reliable as a chocolate teapot." ,
     "Version control is your best friend, so stop procrastinating and start using it." ,
     "Test early, test often, or suffer the consequences." ,
     "Refactor mercilessly, because messy code is a reflection of your incompetence." ,
     "Embrace the command line, because real programmers don't need fancy GUIs." ,
     "Keep learning, because if you think you know everything, you're delusional." ,
     "Practice the art of rubber duck debugging, because sometimes talking to an inanimate object is the only way to solve a problem." ,
     "Understand the principles of object-oriented programming, because it's not just a buzzword." ,
     "Know when to use recursion, because sometimes it's the most elegant solution." ,
     "Master the art of time management, because deadlines don't care about your excuses." ,
     "Learn to read and write pseudocode, because it's a universal language." ,
     "Don't be afraid to ask for help, because nobody knows everything." ,
     "Write tests before you write code, because it's easier to catch bugs early." ,
     "Understand the principles of algorithm design, because efficiency matters." ,
     "Know your data structures, because choosing the right one can make all the difference." ,
     "Document your code, because nobody likes working with a black box." ,
     "Learn to work with APIs, because you can't do everything yourself." ,
     "Pay attention to security, because hackers are always looking for vulnerabilities." ,
     "Don't overcomplicate things, because simplicity is underrated." ,
     "Learn to work with databases, because they're everywhere." ,
     "Know when to use a framework, because reinventing the wheel is rarely a good idea." ,
     "Don't be afraid to refactor old code, because technical debt will come back to haunt you." ,
     "Understand the principles of software architecture, because it's the foundation of any good application." ,
     "Learn to think like a computer, because sometimes you need to get into the machine's head to solve a problem." ,
     "Understand the basics of networking, because you can't escape the internet." ,
     "Don't ignore error handling, because ignoring problems won't make them go away." ,
     "Pay attention to code style, because consistency makes your code easier to read." ,
     "Learn to work with regular expressions, because they're incredibly powerful." ,
     "Know when to use parallelism and concurrency, because sometimes you need to do more than one thing at a time." ,
     "Don't reinvent the wheel, but don't be afraid to customize it, because one size rarely fits all." ,
     "Understand the principles of functional programming, because it's not just for academics." ,
     "Learn to automate repetitive tasks, because nobody likes doing the same thing over and over again." ,
     "Know when to use design patterns, because they're time-tested solutions to common problems." ,
     "Don't ignore performance optimization, because nobody likes a slow application." ,
     "Learn to work with asynchronous code, because sometimes you need to do things out of order." ,
     "Know when to use polymorphism, because sometimes you need to treat objects differently depending on their type." ,
     "Understand the basics of compilers and interpreters, because they're what turn your code into something the computer can understand." ,
     "Don't ignore memory management, because memory leaks are a nightmare to debug." ,
     "Learn to think like a user, because ultimately, they're the ones using your software." ,
     "Pay attention to accessibility, because everyone deserves to use your software, regardless of ability." ,
     "Don't forget about internationalization and localization, because the world is a big place." ,
     "Learn to work with different programming paradigms, because each has its strengths and weaknesses." ,
     "Understand the principles of software testing, because bugs are inevitable." ,
     "Don't be afraid to throw away code that doesn't work, because sometimes it's better to start from scratch." ,
     "Learn to manage dependencies, because nobody likes dependency hell." ,
     "Pay attention to data validation, because garbage in, garbage out." ,
     "Understand the principles of user interface design, because nobody wants to use an ugly application." ,
     "Don't ignore scalability, because success can be a double-edged sword." ,
     "Learn to work with different operating systems, because the world is more than just Windows." ,
     "Pay attention to error messages, because they're trying to tell you something." ,
     "Understand the basics of cryptography, because security matters." ,
     "Don't ignore backward compatibility, because breaking changes can alienate your users." ,
     "Learn to work with different file formats, because data comes in all shapes and sizes." ,
     "Pay attention to system requirements, because not everyone has the latest and greatest hardware." ,
     "Understand the principles of concurrency control, because race conditions are a nightmare." ,
     "Don't ignore performance profiling, because sometimes the bottleneck isn't where you think it is." ,
     "Learn to work with different programming languages, because each has its strengths and weaknesses." ,
     "Pay attention to user feedback, because they're the ones using your software." ,
     "Understand the basics of artificial intelligence and machine learning, because they're shaping the future of technology." ,
     "Don't ignore edge cases, because they have a nasty habit of coming back to bite you." ,
     "Learn to work with different development methodologies, because one size rarely fits all." ,
     "Pay attention to code reviews, because sometimes a fresh pair of eyes is all you need." ,
     "Understand the principles of modularity, because spaghetti code is a nightmare to maintain." ,
     "Don't ignore code documentation, because someday, someone else will have to figure out what your code does." ,
     "Learn to work with different version control systems, because Git isn't the only game in town." ,
     "Pay attention to performance benchmarks, because sometimes you need to know how fast your code is." ,
     "Understand the basics of virtualization and containerization, because they're changing the way we deploy software." ,
     "Don't ignore user privacy, because nobody likes having their data stolen." ,
     "Learn to work with different development tools, because sometimes the right tool can make all the difference." ,
     "Pay attention to software licenses, because violating them can land you in hot water." ,
     "Understand the principles of continuous integration and continuous deployment, because speed matters." ,
     "Don't ignore software updates, because they often contain important security fixes." ,
     "Learn to work with different cloud platforms, because the future is in the cloud." ,
     "Pay attention to performance monitoring, because you can't optimize what you don't measure." ,
     "Understand the basics of quantum computing, because it's the next frontier of computing." ,
     "Don't ignore user experience, because a bad user experience can sink even the best software." ,
     "Learn to work with different web technologies, because the web is everywhere." ,
     "Pay attention to data privacy laws, because violating them can have serious consequences." ,
     "Understand the principles of distributed systems, because the future is decentralized." ,
     "Don't ignore code reviews, because sometimes a second pair of eyes can catch things you missed." ,
     "Learn to work with different APIs, because sometimes you need to integrate with other systems." ,
     "Pay attention to software patents, because violating them can land you in court." ,
     "Understand the basics of cybersecurity, because hackers are constantly evolving." ,
     "Don't ignore software licensing, because violating it can have legal consequences." ,
     "Learn to work with different development methodologies, because one size doesn't fit all." ,
     "Pay attention to code quality, because spaghetti code is a nightmare to maintain." ,
     "Understand the principles of user interface design, because a good UI can make or break your application." ,
     "Don't ignore user feedback, because they're the ones using your software." ,
     "Learn to work with different programming languages, because each has its strengths and weaknesses." ,
     "Pay attention to software updates, because they often contain important security fixes." ,
     "Understand the basics of cryptography, because security matters." ,
     "Don't ignore performance optimization, because nobody likes a slow application." ,
     "Learn to think like a computer, because sometimes you need to get into the machine's head to solve a problem." `;


     useEffect(() => {
      const workbook = XLSX.read(sampleData, { type: 'binary' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const rows = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      setData(rows);

      // Get today's date
      const today = new Date();
      const dayOfMonth = today.getDate();
      const month = today.getMonth() + 1; // Month is zero-based
      const year = today.getFullYear();
      const formattedDate = `${year}-${month < 10 ? '0' + month : month}-${dayOfMonth < 10 ? '0' + dayOfMonth : dayOfMonth}`;

      // Find the index of today's date in the sample data
      const index = data.findIndex(row => row[0].startsWith(formattedDate));

      // If today's date is found, set the current index state
      if (index !== -1) {
        setCurrentIndex(index);
      }
    }, []);
  const handleNext = () => {
    setCurrentIndex(prevIndex => prevIndex + 1);
  };

  const handleBack = () => {
    setCurrentIndex(prevIndex => prevIndex - 1);
  };

  return (
    <div>
      <div className="card">
        {data.length > 0 && (
          <>
            <div style={{fontSize:'20px'}} className="image-container">
              {data [currentIndex] }
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const Hello = () => {
  return <h1>Hello, world!</h1>;
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<YourComponent />} />
      </Routes>
    </Router>
  );
};

export default App;
