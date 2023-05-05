import { Outlet, Link } from 'react-router-dom';


export default function Header() {

    return (
        <div>
            <div className='navbar header'>
                <div className='container'>
                    <div>
                        <Link className='nav-link active' to='/'>Home</Link>
                        <Link className='nav-link' to='/quiz'>Quiz</Link>
                    </div>
                    <h1 className='navbar-brand title'>Alignment With Friends</h1>
                </div>
            </div>
            <Outlet />
        </div>
    )
}