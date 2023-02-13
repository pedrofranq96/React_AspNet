import React from "react";

export default function AtividadeItem(props){
    function prioridadeLabel(param){
        switch(param){
          case 'Baixa':
          case 'Normal':
          case 'Alta':
            return param;
          default:
            return 'Nao definido';
        }
      }

        function prioridadeStyle(param, icone){
          switch(param){
            case 'Baixa':
              return icone ? 'smile': 'success';
            case 'Normal':
              return icone ? 'meh': 'dark';
            case 'Alta':
              return icone ? 'frown' : 'danger';
            default:
              return 'Nao definido';
          }
        }

    return (
        <div  className={"card mb-2 shadow-sm border-" + prioridadeStyle(props.ativ.prioridade)}>
                    
            <div className="card-body">
            <div className="d-flex justify-content-between">
                <h6 className="card-title">
                <span className="badge text-bg-secondary me-1">{props.ativ.id} </span>
                - {props.ativ.titulo}</h6>
                <h6>Prioridade: 
                <span className={"ms-1 text-" + prioridadeStyle(props.ativ.prioridade)}>
                    <i className={"me-1 far fa-" + prioridadeStyle(props.ativ.prioridade, true)}></i>
                    {prioridadeLabel(props.ativ.prioridade)}
                </span>                        
                </h6>
            </div>
            <p className="card-text">{props.ativ.descricao}</p>
            <div className="d-flex justify-content-end pt-2 m-0 border-top">
                <button 
                  className="btn btn-sm btn-outline-primary me-2 "
                  onClick={()=> props.pegarAtividade(props.ativ.id)}>
                  <i className="fas fa-pen me-2"></i>
                  Editar
                </button>
                <button 
                  className="btn btn-sm btn-outline-danger" 
                  onClick={() => props.handleConfirmModal(props.ativ.id)}>
                  <i className="fas fa-trash me-2"></i>
                  Remover</button>
            </div>
            </div>
    </div>);
}