const Warning = ["Cuidado!", "Quase!", "Por pouco!", "Ufa!"];
const Enemies = ["Nossos coelhinhos da floresta", "Nossas toupeiras de broto", "Nossos peixes coelhinhos"];
const Actions = ["roeram", "puxaram", "romperam"];

function RandomRange (array: Array<any>)
{
    return Math.floor(Math.random() * array.length);
}

export function RandomPhrase ()
{
    return `${Warning[RandomRange(Warning)]} ${Enemies[RandomRange(Enemies)]} ${Actions[RandomRange(Actions)]}`;
}