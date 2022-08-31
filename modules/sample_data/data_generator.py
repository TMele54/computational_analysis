from random import randrange

scatter = []
breaks = ["0%", "50%", "75%", "100%"]
for i in range(50):
    scatter.append(
        {
            "x": randrange(-10,10),
            "y": randrange(-10,10),
            "z": randrange(-10,10),
            "id": "point_"+str(i),
            "index": str(i),
            "break": breaks[randrange(4)]
        }
    )

file = open("data/scatter.txt", "w")

for line in scatter:
    file.write(str(line) + "," + "\n")
file.close()

vectors = []
for i in range(7):
    vectors.append(
        {
            "x": 0,
            "y": 0,
            "z": 0,
            "x1": randrange(-10,10),
            "y1": randrange(-10,10),
            "z1": randrange(-10,10),
            "id": "point_"+str(i),
            "index": str(i),
        }
    )

file = open("data/vectors.txt", "w")
for line in vectors:
    file.write(str(line) + "," + "\n")
file.close()