const formatCentsToBrl = (cents: number) => {

    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 2
    }).format(cents / 100);
}

export default formatCentsToBrl;