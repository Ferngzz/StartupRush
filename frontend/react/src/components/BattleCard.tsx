import vsLogo from "../assets/vs_menu_icon_color.svg";
import teamPlaceholder from "../assets/team_logo_placeholder.svg"
import {Team} from "../interfaces/Team"

interface BattleCardProps {
    teams: Team[]
}

export function BattleCard(
    {teams}: BattleCardProps
) {

    return (
        <div className="battleCard">
            <img className="teamLogo" src={teamPlaceholder} alt="Team Logo"/>
            <p>{teams[0].name}</p>
            <img className="vsLogo" src={vsLogo} alt="vsLogo"/>
            <p>{teams[1].name}</p>
            <img className="teamLogo" src={teamPlaceholder} alt="Team Logo"/>
        </div>
    );

}