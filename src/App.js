import React, { Component } from 'react';
import api from './api';

class App extends Component {

  state = {
    filmes: [],
    query: ""
  }

  // async componentDidMount() {
  //   const response = await api.get('star%20wars');
  //   this.setState({ filmes: response.data });
  // }

  handleInputChange = e => this.setState({ query: e.target.value });

  async fetchFilmes(query) {
    const response = await api.get(query);
    this.setState({ filmes: response.data });
  }

  handleSubmit = e => {
    e.preventDefault();
    const { query } = this.state;
    this.fetchFilmes(query);
  }

  render() {
    const {filmes, query} = this.state;
    
    return (
      <>
      <div className='h-full'>
        <h1>Listar filmes</h1>
        <form>
          <label htmlFor="">Pesquisar por Título</label>
          <input type="text" name="query" id="query" value={query} onChange={this.handleInputChange} />
          <button type="submit" onClick={this.handleSubmit}>Pesquisar</button>
        </form>
      </div>
      <div>
        <h1>Star Filmes</h1>
        {filmes.map(filme => (
          <li key={filme.show.id}>            
            <h2 style={{display: 'inline'}}>
              <strong>Título: </strong>
              {filme.show.name}
            </h2>
            <p>
              {filme.show.url}
            </p>
            <p>
              {filme.show.image && filme.show.image.medium ? ( <img src={filme.show.image.medium} height={200} /> ) : (<span>Imagem não disponível</span>)}
            </p>
          </li>
        ))}
      </div>
      </>
    );
  }
}

export default App;