import { useEffect, useState } from 'react';
import logo from './logo.png';
import './App.css';
import MyButton from './components/MyButton';
import ListModal from './components/ListModal';
import { PlusOutlined } from '@ant-design/icons';
import Fire from "./Fire";
import { Spin } from 'antd';
import ListCard from './components/ListCard';

export default function App() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [lists, setLists] = useState([]);
  const [selectedList, setSelectedList] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const firebase = new Fire((error) => {
      if (error) {
        setError(error);
      } else {
        firebase.getLists(lists => {
          setLists(lists);
          setLoading(false);
        });
      }
      return function unsubscribe() {
        firebase.detach();
      }
    });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Bienvenue sur mon application de gestion de listes
        </p>
        {error && (<p className="text-danger">Erreur : {error.message}</p>)}
        {loading ? <Spin /> : (
          <div className="d-flex flex-wrap">
            {lists.map(list => (  
              <ListCard key={list.id} list={list} setIsModalVisible={setIsModalVisible} setSelectedList={setSelectedList} />
            ))}
          </div>
        )}
        <MyButton
          tooltip="Ajouter une liste"
          onClick={() => setIsModalVisible(true)}
          icon={<PlusOutlined />}
        >
          Ajouter une liste
        </MyButton>
        {isModalVisible && (
          <ListModal list={selectedList} modalTitle={selectedList ? "Modifier la liste" : "Ajouter une liste"} isVisible={isModalVisible} handleCancel={() => setIsModalVisible(false)} />
        )}
      </header>
    </div>
  );
}