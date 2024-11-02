import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from '../ReusableComponents/Button';

import '../CSS/Home.css';

const Home = ({ isAuthenticated }) => {
    const words = ["Welcome", "to", "Your", "Task", "Manager!"];
    const images = [
        'url("https://t3.ftcdn.net/jpg/08/39/24/40/240_F_839244045_yc0Vx9TKc82MGe3fcPyZjh0T7gm2qHSs.jpg")',
        'url("https://img.freepik.com/premium-photo/secretary-managing-busy-schedule-prioritizing-tasks_1022901-95696.jpg?w=740")',
        'url("https://img.freepik.com/free-vector/effective-time-planning-isometric-background-with-people-making-business-schedule-routine-management_1284-31990.jpg?t=st=1730031306~exp=1730034906~hmac=942b8eb88c7f20029664b43b8543cb4d8aeb626f7bd8acd511218846593b34d1&w=740")'
    ];

    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 5000);

        return () => clearInterval(intervalId);
    }, [images.length]);

    return (
        <main 
            className="home-container"
            style={{ backgroundImage: images[currentImageIndex] }}
        >
            <div className="text-center fade-in">
                <h2 
                    key={currentImageIndex} 
                    className="display-4 text-black" 
                >
                    {words.map((word, index) => (
                        <span key={index} className="slide-in" style={{ animationDelay: `${index * 0.3}s` }}>
                            {word}{" "}
                        </span>
                    ))}
                </h2>
                <p className="lead text-black">Manage your tasks effortlessly!</p>
                <Link to={isAuthenticated ? "/taskslist" : "/login"}>
                    <Button className="btn-lg btn-light mt-4 bounce">Get Started</Button>
                </Link>
            </div>
        </main>
    );
};

export default React.memo(Home);
