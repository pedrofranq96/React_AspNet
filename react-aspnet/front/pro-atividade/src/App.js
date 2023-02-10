import {useState, useEffect} from 'react';
import AtividadeForm from './components/AtividadeForm';
import AtividadesLista  from './components/AtividadesLista';
import api from './api/atividade';
import './App.css';
import {Button, Modal} from 'react-bootstrap';


function App() {
  const [showAtividadeModal, setShowAtividadeModal] = useState(false);
  const [smShowConfirmModal, setSmShowConfirmModal] = useState(false);
  
  const [atividades, setAtividades] = useState([]);
  const [atividade, setAtividade] = useState({id: 0});

  const handleAtividadeModel = () => setShowAtividadeModal(!showAtividadeModal);
  const handleConfirmModal = (id) => {
    if(id !== 0 && id !== undefined) {
      const atividade = atividades.filter((atividade)=> atividade.id === id);
      setAtividade(atividade[0]);
    }
    else{
      setAtividade({id : 0})
    }
    setSmShowConfirmModal(!smShowConfirmModal);
  }

  const pegaTodasAtividades= async () =>{
    const response = await api.get('atividade');
    return response.data;    
  };

  const novaAtividade = () =>{
    setAtividade({ id: 0});
    handleAtividadeModel();
  }

  useEffect(()=>{
    const getAtividades = async () =>{
      const todasAtividades = await pegaTodasAtividades();
      if(todasAtividades) setAtividades(todasAtividades);
    };
    getAtividades();
  }, []) 

  const addAtividade = async (ativ) =>{      
    handleAtividadeModel();
    const response = await api.post('atividade', ativ);

    setAtividades([...atividades,response.data]);
  }

  const cancelarAtividade = () => {
    setAtividade({id: 0})
    handleAtividadeModel();
  }

  const atualizarAtividade = async(ativ)=>  {
    handleAtividadeModel();
    const response = await api.put(`atividade/${ativ.id}`, ativ)
    const {id} = response.data;
    setAtividades(atividades.map(item => item.id === id ? response.data : item));
    setAtividade({id: 0})
  }
    
  const deletarAtividade = async (id) => {    
    handleConfirmModal(0);
    if (await api.delete(`atividade/${id}`)) {
        const atividadesFiltradas = atividades.filter(
            (atividade) => atividade.id !== id
        );
        setAtividades([...atividadesFiltradas]);
    }
  }

  const pegarAtividade =(id) => {
    const atividade = atividades.filter((atividade)=> atividade.id === id);
    setAtividade(atividade[0]);
    handleAtividadeModel();
  }

  return (
    <>
        <div className="d-flex justify-content-between align-items-end mt-2 pb-3 border-bottom border-1">
          <h1 className="m-0 p-0">Atividade {atividade.id !== 0 ? atividade.id : ''}</h1>
          <Button variant="outline-secondary" onClick={novaAtividade}>
            <i className="fas fa-plus"></i>
          </Button>
        </div>         
        <AtividadesLista
          atividades={atividades}
          pegarAtividade = {pegarAtividade} 
          handleConfirmModal = {handleConfirmModal}
        />  
        <Modal show={showAtividadeModal} onHide={handleAtividadeModel}>
            <Modal.Header closeButton>
              <Modal.Title>Atividade {atividade.id !== 0 ? atividade.id : ''}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                  <AtividadeForm 
                    addAtividade={addAtividade}
                    cancelarAtividade={cancelarAtividade}
                    atualizarAtividade={atualizarAtividade}
                    ativSelecionada ={atividade}
                    atividades={atividades}
                  />
              </Modal.Body>              
        </Modal>      

        <Modal
            size="sm" 
            show={smShowConfirmModal}
            onHide={handleConfirmModal}>
            
            <Modal.Header closeButton>
              <Modal.Title>
                
                Excluindo Atividade {' '}
                {atividade.id !== 0 ? atividade.id : ''}
              
              </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                  Tem certeza que deseja excluir a atividade {atividade.id}?
              </Modal.Body>
              <Modal.Footer className="d-flex justify-content-between">
                  <button className="btn btn-outline-success me-2" onClick={() => deletarAtividade(atividade.id)}>
                      <i className="fas fa-check me-2"></i>
                      Sim
                  </button>
                  <button className="btn btn-danger me-2" onClick={() => handleConfirmModal(0)}>
                     <i className="fas fa-times me-2"></i>
                      Não
                  </button>
              </Modal.Footer>  
        </Modal>      
    </>     
  );
}

export default App;
