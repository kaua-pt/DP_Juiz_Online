import './App.css';
import { ETargetLanguages } from './enums/ETargetLanguages';
import DynamicDuolingo from './services/Translate'

function App() {
  const tradutor = new DynamicDuolingo();

  const translate = (str = "imao do ceu", len = ETargetLanguages.French) => {
    tradutor.translate(str, len)
  }



  return (
    <div className="App">
      {translate()}
    </div>
  );
}

export default App;