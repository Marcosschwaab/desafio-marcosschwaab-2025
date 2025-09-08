import { AbrigoAnimais } from "./abrigo-animais";

describe('Abrigo de Animais', () => {

  test('Deve rejeitar animal inválido', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('CAIXA,RATO', 'RATO,BOLA', 'Lulu');
    expect(resultado.erro).toBe('Animal inválido');
    expect(resultado.lista).toBeFalsy();
  });

  test('Deve rejeitar animal duplicado', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('CAIXA,RATO', 'RATO,BOLA', 'Rex,Rex');
    expect(resultado.erro).toBe('Animal inválido');
    expect(resultado.lista).toBeFalsy();
  });

  test('Deve rejeitar brinquedo inválido', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('CAIXA,PEDRA', 'RATO,BOLA', 'Rex');
    expect(resultado.erro).toBe('Brinquedo inválido');
    expect(resultado.lista).toBeFalsy();
  });

  test('Deve rejeitar brinquedo duplicado', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('CAIXA,RATO,RATO', 'RATO,BOLA', 'Rex');
    expect(resultado.erro).toBe('Brinquedo inválido');
    expect(resultado.lista).toBeFalsy();
  });

  test('Deve encontrar pessoa para um animal', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'RATO,BOLA', 'RATO,NOVELO', 'Rex,Fofo');
      expect(resultado.lista[0]).toBe('Fofo - abrigo');
      expect(resultado.lista[1]).toBe('Rex - pessoa 1');
      expect(resultado.lista.length).toBe(2);
      expect(resultado.erro).toBeFalsy();
  });

  test('Deve encontrar pessoa para um animal (pessoa 2)', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'RATO,NOVELO', 'RATO,BOLA', 'Rex,Fofo');
      expect(resultado.lista[0]).toBe('Fofo - abrigo');
      expect(resultado.lista[1]).toBe('Rex - pessoa 2');
      expect(resultado.lista.length).toBe(2);
      expect(resultado.erro).toBeFalsy();
  });

  test('Deve encontrar pessoa para um animal intercalando brinquedos', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('BOLA,LASER',
      'BOLA,NOVELO,RATO,LASER', 'Mimi,Fofo,Rex,Bola');

      expect(resultado.lista[0]).toBe('Bola - abrigo');
      expect(resultado.lista[1]).toBe('Fofo - pessoa 2');
      expect(resultado.lista[2]).toBe('Mimi - abrigo');
      expect(resultado.lista[3]).toBe('Rex - abrigo');
      expect(resultado.lista.length).toBe(4);
      expect(resultado.erro).toBeFalsy();
  });

  test('Ninguém deve adotar se ambos puderem', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('RATO,BOLA', 'RATO,BOLA', 'Rex');
    expect(resultado.lista[0]).toBe('Rex - abrigo');
    expect(resultado.erro).toBeFalsy();
  });

  test('Gatos não devem compartilhar brinquedos', () => {
    // Pessoa 1 poderia adotar Mimi e Zero, mas os brinquedos de gato não são compartilhados.
    const resultado = new AbrigoAnimais().encontraPessoas('BOLA,LASER,RATO', '', 'Mimi,Zero');
    expect(resultado.lista[0]).toBe('Mimi - pessoa 1');
    expect(resultado.lista[1]).toBe('Zero - abrigo');
    expect(resultado.erro).toBeFalsy();
  });

  test('Pessoa não pode adotar mais de 3 animais', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('LASER,RATO,BOLA,CAIXA,NOVELO,SKATE', '', 'Rex,Bebe,Bola,Loco');
    expect(resultado.lista[0]).toBe('Bebe - pessoa 1');
    expect(resultado.lista[1]).toBe('Bola - pessoa 1');
    expect(resultado.lista[2]).toBe('Loco - abrigo'); // Não pode adotar o 4º
    expect(resultado.lista[3]).toBe('Rex - pessoa 1');
    expect(resultado.erro).toBeFalsy();
  });

  test('Loco só pode ser adotado com companhia', () => {
    // Pessoa 1 tem os brinquedos do Loco, mas nenhum outro animal
    const resultado1 = new AbrigoAnimais().encontraPessoas('SKATE,RATO', '', 'Loco');
    expect(resultado1.lista[0]).toBe('Loco - abrigo');

    // Pessoa 2 adota Rex e depois pode adotar Loco
    const resultado2 = new AbrigoAnimais().encontraPessoas('', 'RATO,BOLA,SKATE', 'Rex,Loco');
    expect(resultado2.lista[0]).toBe('Loco - pessoa 2');
    expect(resultado2.lista[1]).toBe('Rex - pessoa 2');
  });

  test('Deve lidar com entradas vazias ou nulas', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('', null, '');
    expect(resultado.lista.length).toBe(0);
    expect(resultado.erro).toBeFalsy();
  });
});