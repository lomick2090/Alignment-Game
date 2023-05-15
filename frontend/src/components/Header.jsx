import { Outlet, Link } from 'react-router-dom';
import { useUserContext } from '../utils/Context';
import returnUser from '../utils/returnUser'


export default function Header() {
    const userList = useUserContext()
    return (
        <div>
            <div className='header'>
                <div className='container headercontainer'>
                    <div style={{display:'flex', gap:'10px'}}>
                            <Link className='nav-link active' to='/'>Home</Link>
                            <Link className='nav-link' to='/groups'>Groups</Link>

                    </div>
                    <h1 className='title'>Alignment With Friends</h1>
                    <div style={{marginLeft:'auto'}}>
    
                        {
    
                            returnUser(userList).name
                            ||
                            <Link className='nav-link' to='/login'>Login</Link>
                        }
                    </div>
                </div>
            </div>
            <Outlet />
        </div>
    )
}