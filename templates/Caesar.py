import sys

def caeser(letter, key):
    alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
    #alphabet_Maj = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U','V', 'W', 'X', 'Y', 'Z']
    umlaeute_alphabet = [ ('ä', alphabet.index('a') ), ('ö', alphabet.index('o') ), ('ü', alphabet.index('u') ) ]
    for i in alphabet:
        if letter == i:
            newIndex = (alphabet.index(letter)  + key) % 26
        elif letter not in alphabet and letter not in umlaeute_alphabet:
            newIndex = letter
        else:
            for j in umlaeute_alphabet:
                if letter == j[0]:
                    newIndex = (j[1] + key) % 26

    if type(newIndex) == int:
        return alphabet[newIndex]
    else:
        return newIndex

def caeser_word(word,key):
    new_word = ''
    for index in range(len(word)):
        new_word += caeser(word[index],key)
    return new_word


# python -> ’ravjqp’
#orignal_Version = sys.argv[1]
#caeser_Vision = sys.argv[2]
#key = int(sys.argv[3])

def transformation(orignal_Version,caeser_Version,key):
    with open(orignal_Version, "r") as rd:
        zeilen = rd.readlines()
    print("Ich lese diese Zeile vom File \n", zeilen)

    final_Zeilen = []
    for zeile in zeilen:
        array_words = zeile[:-1].split(' ')
        new_array_words = []
        for word in array_words:
            new_array_words.append(caeser_word(word, key))
        final_Zeilen.append(' '.join(new_array_words) + '\n')
    print("Caesar Resultat:\n", final_Zeilen)

    with open(caeser_Version, "w") as wr:
        wr.writelines(final_Zeilen)



