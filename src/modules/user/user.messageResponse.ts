interface IMessageResponse {
  data: number;
}

export class MessageResponse implements IMessageResponse {
  public readonly data: number;

  constructor(data: number) {
    this.data = data;
  }

  public getCurrentStreakMessage(): string {
    if (this.data < 3) {
      return `Você está apenas começando sua jornada com ${this.data} dia(s). Continue se esforçando!`;
    } else if (this.data >= 3 && this.data <= 5) {
      return `Bom trabalho! Você mantém um streak de ${this.data} dias. Estou curtindo do seu desempenho!`;
    } else if (this.data === 6) {
      return `Excelente! Você alcançou a marca de ${this.data} dias consecutivos. Você passará para a próxima fase. Parabéns!`;
    } else {
      return `Uauuuuu, ${this.data} dias consecutivos! Você está superando minhas expectativas!`;
    }
  }

  public getBestStreakMessage(): string {
    if (this.data < 3) {
      return `Seu recorde atual é de ${this.data} dia(s). humm... Acho que dá pra melhorar, hein?!`;
    } else if (this.data >= 3 && this.data <= 6) {
      return `Legal! Seu melhor streak é de ${this.data} dias.`;
    } else {
      return `Magnifico! Você alcançou um recorde de ${this.data} dias!`;
    }
  }

  public getLevelMessage(): string {
    if (this.data < 3) {
      return `Nível Iniciante: continue evoluindo!`;
    } else if (this.data >= 3 && this.data <= 6) {
      return `Nível Intermediário: você já está indo bem!`;
    } else {
      return `Nível Avançado: impressionante!`;
    }
  }
}
