import { useState } from 'react'

export default function Create() {
    const [group, setGroup] = useState('')


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