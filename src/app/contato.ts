export class Contato {
    private _nome : string;
    private _telefone : string;
    private _sexo : string;
    private _dataDeNascimento : any;

    constructor(nome : string, telefone : string, sexo : string, dataDeNascimento : any)
    {
        this._nome = nome;
        this._telefone = telefone;
        this._sexo = sexo;
        this._dataDeNascimento = dataDeNascimento;
    }

    public get nome():string
    {
        return this._nome;
    }

    public set nome(nome :string)
    {
        this._nome = nome;
    }

    public get telefone():string
    {
        return this._telefone;
    }

    public set telefone(telefone :string)
    {
        this._telefone = telefone;
    }

    public get sexo(): string
    {
        return this._sexo;
    }

    public set sexo(sexo :string)
    {
        this._sexo = sexo;
    }

    public get dataDeNascimento(): any
    {
        return this._dataDeNascimento;
    }

    public set dataDeNascimento(dataDeNascimento : any)
    {
        this._dataDeNascimento = dataDeNascimento;
    }
}
