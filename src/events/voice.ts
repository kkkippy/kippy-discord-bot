import {
    VoiceState,
    Events
} from "discord.js";

import { createVoiceChannel } from "../data/ids.json";

export const eventName = Events.VoiceStateUpdate;

export const execute = async (oldState: VoiceState, newState: VoiceState) => {
    const member = newState.member;

    /*
    newState.channelId => Se estiver vazio, significa que o usuário saiu do canal de voz
    */

    /*
    Se o newState.channelId for 1262969483132141729, então o usuário entrou na call "Criar call"
    Se o oldState.channelId for 1262969483132141729 e o próximo for o ID do canal criado

    Se o oldState.channelId for o ID do canal criado e o newState.channelId for qualquer outro ID,
    então a posse do canal de voz será passada ao usuário que utilizar o comando /reivindicar-posse,
    mas não poderão usar este comando com o proprietário da call dentro da call,
    mas enquanto ninguém pegar a posse, então o usuário poderá voltar e continuar editando o canal

    Apenas o proprietário da chamada poderá alterar as configurações do canal

    TODO: Considerar alterar as configurações do canal automaticamente de acordo com as configurações já definidas
    pelo usuário caso ele já tenha criado alguma chamada ou então ela será sobreposta com as configurações do canal
    do usuário no qual ele reivindicou a posse
    */

    const enteredCreateVoiceChannel = newState.channelId === createVoiceChannel;

    
}