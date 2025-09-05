const ANIMAIS = {
  Rex: { tipo: "cão", brinquedos: ["RATO", "BOLA"] },
  Mimi: { tipo: "gato", brinquedos: ["BOLA", "LASER"] },
  Fofo: { tipo: "gato", brinquedos: ["BOLA", "RATO", "LASER"] },
  Zero: { tipo: "gato", brinquedos: ["RATO", "BOLA"] },
  Bola: { tipo: "cão", brinquedos: ["CAIXA", "NOVELO"] },
  Bebe: { tipo: "cão", brinquedos: ["LASER", "RATO", "BOLA"] },
  Loco: { tipo: "jabuti", brinquedos: ["SKATE", "RATO"] },
};

const TODOS_BRINQUEDOS = ["RATO", "BOLA", "LASER", "CAIXA", "NOVELO", "SKATE"];

class AbrigoAnimais {
  encontraPessoas(brinquedosPessoa1, brinquedosPessoa2, ordemAnimais) {
    const animaisSolicitados = ordemAnimais
      ? ordemAnimais
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean)
      : [];
    const brinquedos1 = brinquedosPessoa1
      ? brinquedosPessoa1
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean)
      : [];
    const brinquedos2 = brinquedosPessoa2
      ? brinquedosPessoa2
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean)
      : [];

    const erro = this.validarEntradas(animaisSolicitados, [
      brinquedos1,
      brinquedos2,
    ]);
    if (erro) return { erro };
    const pessoa1 = { adocoes: 0, brinquedosGatoUsados: new Set() };
    const pessoa2 = { adocoes: 0, brinquedosGatoUsados: new Set() };

    return { ok: { pessoa1, pessoa2 } };
  }

  validarEntradas(animais, listasBrinquedos) {
    if (new Set(animais).size !== animais.length) return "Animal inválido";
    for (const animal of animais) {
      if (!ANIMAIS[animal]) return "Animal inválido";
    }

    for (const lista of listasBrinquedos) {
      if (new Set(lista).size !== lista.length) return "Brinquedo inválido";
      for (const brinquedo of lista) {
        if (!TODOS_BRINQUEDOS.includes(brinquedo)) return "Brinquedo inválido";
      }
    }
    return null;
  }

  atingiuLimite(pessoa) {
    return pessoa.adocoes >= 3;
  }
  pessoaPodeAdotar(pessoa, animal, brinquedosPessoa, nomeAnimal) {
    if (this.atingiuLimite(pessoa)) return false;
    if (animal.tipo === "gato") {
      for (const b of animal.brinquedos) {
        if (pessoa.brinquedosGatoUsados.has(b)) return false;
      }
    }
    if (nomeAnimal === "Loco") {
      const possuiTodos = animal.brinquedos.every((b) =>
        brinquedosPessoa.includes(b)
      );
      return pessoa.adocoes > 0 && possuiTodos;
    }
    return this.segueOrdemDesejada(animal.brinquedos, brinquedosPessoa);
  }

  segueOrdemDesejada(seqDesejada, listaPessoa) {
    let ultimo = -1;
    for (const item of seqDesejada) {
      const idx = listaPessoa.indexOf(item, ultimo + 1);
      if (idx === -1) return false;
      ultimo = idx;
    }
    return true;
  }
}
export { AbrigoAnimais as AbrigoAnimais };
