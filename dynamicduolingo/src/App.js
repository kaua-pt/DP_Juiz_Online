import './App.css';
import DynamicDuolingo from './services/Translate'

function App() {
  const tradutor = new DynamicDuolingo();

  const translate = (str, len = 'PtBr') => {
    tradutor.translate(str, len)
  }



  return (
    <div className="App">
      {translate('hello')}
    </div>
  );
}

export default App;