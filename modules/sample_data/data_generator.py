from random import randrange

companies = {
    "A": [
        [1, 2, 3]
    ],
    "B": [
        [3, 4, 5]
    ],
    "C": [
        [5, 6, 7]
    ],
    "D": [
        [7, 8, 9]
    ],
    "E": [
        [9, 10, 11]
    ]
}
domains = {
    "one": [
        [1, 1, 3], [4, 2, 7]
    ],
    "two": [
        [5, 5, 5], [2, 4, 7]
    ],
    "three": [
        [4, 6, 5], [6, 3, 9]
    ],
    "four": [
        [2, 3, 9], [8, 3, 1]
    ],
    "five": [
        [9, 1, 1], [3, 9, 2]
    ]
}

scatter = []
breaks = ["0%", "50%", "75%", "100%"]
for i in range(500):
    scatter.append(
        {
            "x": randrange(10),
            "y": randrange(10),
            "z": randrange(10),
            "id": "point_"+str(i),
            "index": str(i),
            "break": breaks[randrange(4)]
        }
    )

file = open("data/scatter.txt", "w")

for line in scatter:
    file.write(str(line) + "," + "\n")

file.close()
