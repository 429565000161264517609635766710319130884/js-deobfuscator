"""
Memo :
- OSA : Obfuscated strings array

Notes :
- This program may not work with all degrees of desobfuscation.
- It makes the heavyest work but you still need to do some manually stuff to get a clean code.
- I suggest to use a JS beautifier once the output.js file is written.
"""

import re
import os
import sys


def write_code_file(code: str, path: str):
    with open(path, 'w+', encoding="utf-8") as stream:
        stream.write(code)
    stream.close()


def find_strings_array(content: str) -> tuple:
    """ Get the OSA from the top of the code. """
    raw_array = re.search(
        r"var (_0x[a-f0-9]{4})=(\[[\"\\\\u\\x0-9A-F\,]+\]);", content)
    array_name = raw_array.group(1)
    raw_array_content = raw_array.group(2).encode().decode("unicode-escape")
    array = []
    is_string = False
    string = ""

    for i in range(len(raw_array_content)):
        c = raw_array_content[i]

        if not is_string and c == '"':
            is_string = True
            continue

        if is_string and c == '"':
            is_string = False
            array.append(string)
            string = ""
            continue

        if is_string and c != '"':
            string += c
            continue

    return (array_name, array, raw_array[0])


def read_code_file(path: str) -> str:
    with open(path, "r", encoding="utf-8") as stream:
        content = stream.read()
    stream.close()
    return content


def main():
    if len(sys.argv) < 2:
        print("The input JS file is missing.\n\nUsage :\npython3 %s <source.js>" % (__file__))
        return 1

    input_path = sys.argv[1]

    code = read_code_file(input_path)
    array_name, array, match = find_strings_array(code)

    # Removes the OSA of the code.
    code = code.replace(match, '')

    # Replaces the reference to the OSA to get the refered string's index by the string itself.
    strings_list_occurences = re.compile(r"_0x[0-9a-f]{4}\[(\d+)\]")
    for i in strings_list_occurences.findall(code):
        i = int(i)
        code = code.replace("%s[%d]" % (array_name, i), "\"%s\"" % (array[i]))

    # Transformations :
    # o["hello"]() => o.hello()
    # o["hello"]["attr"] => o.hello.attr
    dico_references = re.compile(r"\[\"(\w+)\"\]")
    for reference in dico_references.findall(code):
        code = code.replace("[\"%s\"]" % (reference), ".%s" % (reference))

    # Checking for any rest of unescaped string
    unescaped_strings = re.compile(
        r"(\"|\'|\`)((\\(u|x)[0-9A-F]+)+)(\"|\'|\`)")
    for unescaped_string in unescaped_strings.findall(code):
        unicode = unescaped_string[1]
        quote_type = unescaped_string[0]
        code = code.replace("%s%s%s" % (quote_type, unicode, quote_type), "\"%s\"" % (
            unicode.encode().decode("unicode-escape")))

    write_code_file(code.replace("\n", " "), os.path.join("/".join(input_path.split("/")[0:-1]), "output.js"))
    return 0


if __name__ == "__main__":
    main()
