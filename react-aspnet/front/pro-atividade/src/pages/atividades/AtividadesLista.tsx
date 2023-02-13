import React from 'react';
import AtividadeItem from './AtividadeItem';
import { AtividadeListaProps } from '../../model/atividadeProps';




const AtividadesLista:React.FC<AtividadeListaProps> =(
    {
      atividades, pegarAtividade, handleConfirmModal
    }: AtividadeListaProps
  )=> {
  return (
    <div className="mt-3">      
            {atividades.map((ativ)=>(
                <AtividadeItem
                 key={ativ.id} 
                  ativ = {ativ}
                  pegarAtividade = {pegarAtividade}
                  handleConfirmModal = {handleConfirmModal}
                />
            ))}
    </div>    
  )
}

export default AtividadesLista;
