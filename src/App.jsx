import React, { useState, useEffect } from 'react';
import axios from 'axios';
function App() {
    const [value, setValue] = useState("");
    const [enter, setEnter] = useState("Pagnavathcoding");
    const [user, setUser] = useState([]);
    const [err, setErr] = useState("");
    useEffect(() => {
        async function githubUser() {
            const res = axios.get(`https://api.github.com/users/${enter}`);
            return res.then((data) => {
                const userInfos = data.data;
                setUser({
                    image: userInfos.avatar_url,
                    bio: userInfos.bio,
                    company: userInfos.company,
                    created: userInfos.created_at,
                    location: userInfos.location,
                    username: userInfos.login,
                    repos: userInfos.public_repos,
                    blog: userInfos.blog,
                    followers: userInfos.followers,
                    following: userInfos.following,
                    mainUrl: userInfos.url,
                    twitter: userInfos.twitter_username
                });
            }).catch((err) => {
                if (err) {
                    setErr("Username incorrect!")
                    setTimeout(() => {
                        setErr("")
                    }, 5000)
                }
            })
        }
        githubUser()
    }, [enter])
    function enterSubmit(e) {
        if (e.key === "Enter") {
            if (value === "") return;
            setEnter(value);
        }
    }
    function clickSubmit() {
        if (value === "") return;
        setEnter(value);
    }
    return (
        <main>
            <header>
                <h1>Github User</h1>
            </header>
            <section className="container">
                <div className="err">
                    <p>{err}</p>
                </div>
                <div className="search">
                    <input type="text" placeholder="Search github user..." value={value} onChange={e => setValue(e.target.value)} onKeyPress={enterSubmit} />
                    <button onClick={clickSubmit}>Search</button>
                </div>
                <div className="profile">
                    <img src={user.image} />
                    <h1>{user.username}</h1>
                    <p>{user.bio}</p>
                </div>
                <div className="infos">
                    <div className="info">
                        <h3>Repositories</h3>
                        <p>{user.repos < 10 ? "0" + user.repos : user.repos}</p>
                    </div>
                    <div className="info">
                        <h3>Followers</h3>
                        <p>{user.followers < 10 ? "0" + user.followers : user.followers}</p>
                    </div>
                    <div className="info">
                        <h3>Following</h3>
                        <p>{user.following < 10 ? "0" + user.following : user.following}</p>
                    </div>
                </div>
                <div className="datas">
                    <div className="data">
                        <p>Website: {user.blog === "" ? "Not showing" : user.blog}</p>
                    </div>
                    <div className="data">
                        <p>Company: {user.company === null ? "Not showing" : user.company}</p>
                    </div>
                    <div className="data">
                        <p>Location: {user.location === null ? "Not showing" : user.location}</p>
                    </div>
                </div>
            </section>
        </main>
    )
}
export default App;