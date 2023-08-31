import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../store';

const Header = () => {
    const disPatch = useDispatch();
    const isLoggedIn = useSelector(state => state.isLoggedIn);

    return (
        <div className="navbar">
            <div className="nav-logo"><h1>Bloom.</h1></div>
            <div className="nav-links">
                {isLoggedIn && <ul className="top-ul">
                    <Link to={"/blogs"} className='link'>
                        <li>
                            All Blogs
                            <ArrowCircleRightIcon fontSize='small' />
                        </li>
                    </Link>
                    <Link to={"/myBlogs"} className='link'>
                        <li>
                            My Blogs
                            <ArrowCircleRightIcon fontSize='small' />
                        </li>
                    </Link>
                    <Link to={"/blogs/add"} className='link'>
                        <li>
                            Add Blog
                            <ArrowCircleRightIcon fontSize='small' />
                        </li>
                    </Link>
                </ul>}
                <ul className='bottom-ul'>
                    { !isLoggedIn && <><Link to={"/auth"} className='link'>
                        <li className='login'>
                            Login
                        </li>
                    </Link></>}
                    {isLoggedIn && <Link to={"/auth"} className='link' onClick={() => disPatch(authActions.logout())} >
                        <li>
                            LogOut
                        </li>
                    </Link>}
                </ul>
            </div>
        </div>
    );
}

export default Header;
