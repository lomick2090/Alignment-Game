import { Outlet, Link } from 'react-router-dom';


export default function Header() {

    return (
        <div>
            <div className='navbar header'>
                <div className='container'>
                    <div style={{display:'flex'}}>
                        <div>
                            <Link className='nav-link active' to='/'>Home</Link>
                            <Link className='nav-link' to='/quiz'>Quiz</Link>
                        </div>
                        <div>
                            <Link className='nav-link' to='/login'>Login</Link>
                            <Link className='nav-link' to='/create'>Create</Link>
                        </div>
                    </div>
                    <h1 className='navbar-brand title'>Alignment With Friends</h1>
                </div>
            </div>
            <Outlet />
        </div>
    )
}