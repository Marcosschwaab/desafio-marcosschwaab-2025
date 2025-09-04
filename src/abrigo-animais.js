const ANIMAIS = {
  Rex:  { tipo: 'cão',   brinquedos: ['RATO', 'BOLA'] },
  Mimi: { tipo: 'gato',  brinquedos: ['BOLA', 'LASER'] },
  Fofo: { tipo: 'gato',  brinquedos: ['BOLA', 'RATO', 'LASER'] },
  Zero: { tipo: 'gato',  brinquedos: ['RATO', 'BOLA'] },
  Bola: { tipo: 'cão',   brinquedos: ['CAIXA', 'NOVELO'] },
  Bebe: { tipo: 'cão',   brinquedos: ['LASER', 'RATO', 'BOLA'] },
  Loco: { tipo: 'jabuti',brinquedos: ['SKATE', 'RATO'] },
};

const TODOS_BRINQUEDOS = ['RATO', 'BOLA', 'LASER', 'CAIXA', 'NOVELO', 'SKATE'];

class AbrigoAnimais {

encontraPessoas(brinquedosPessoa1, brinquedosPessoa2, ordemAnimais) {
  const animaisSolicitados = ordemAnimais ? ordemAnimais.split(',').map(s => s.trim()).filter(Boolean) : [];
  const brinquedos1 = brinquedosPessoa1 ? brinquedosPessoa1.split(',').map(s => s.trim()).filter(Boolean) : [];
  const brinquedos2 = brinquedosPessoa2 ? brinquedosPessoa2.split(',').map(s => s.trim()).filter(Boolean) : [];

    return { debug: { animaisSolicitados, brinquedos1, brinquedos2 } };
  }
}

export { AbrigoAnimais as AbrigoAnimais };
