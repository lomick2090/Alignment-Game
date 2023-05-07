import { useParams } from "react-router-dom"


export default function GroupPage() {
    const { groupName } = useParams()

    return (
        <div className="grouppage">
            {groupName}
            <div className="chart">
                <div className="userholder">
                </div>

            </div>
            
        </div>
    )
}