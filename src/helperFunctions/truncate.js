const truncate = (sentence, upto) => {
    let newSentence = sentence.split(' ').slice(0, upto).join(' ');
    if (sentence.split(' ').length > upto) {
        newSentence = newSentence + '...';
    }

    return newSentence;
}

export default truncate;