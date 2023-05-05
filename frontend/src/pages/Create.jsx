import { useState } from 'react'
import mysql from 'mysql2'
import env from 'dotenv'
env.config();

export default function Create() {
    const [group, setGroup] = useState('')

    const pool = mysql.createPool({
        host: process.env.SQL_HOST,
        user: process.env.SQL_USERNAME,
        password: process.env.SQL_PASSWORD,
        database: 'alignment_users'
    })

    async function onSubmit() {
        const result = await pool.query(`
        INSERT INTO groupnames (title)
        VALUES (?, ?)
        `, [group])
        setGroup('')
    }

    function handleChange(e) {
        const { value } = e.target;
        setGroup(value);
    }
    return (
        <div>
            <input type="text" value={group} onChange={handleChange} placeholder='group name'/>
            <button>Add Group</button>
        </div>
    )
}