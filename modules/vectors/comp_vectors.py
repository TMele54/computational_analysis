import numpy as np
import math

def dotproduct(v1, v2):
  return sum((a*b) for a, b in zip(v1, v2))

def magnitude(v):
  return math.sqrt(dotproduct(v, v))

def angle(v1, v2):
  return math.acos(dotproduct(v1, v2) / (magnitude(v1) * magnitude(v2)))

vector_1 = [12,0,0]
vector_2 = [4,4,0]

print("magnitude 1:",magnitude(vector_1))
print("magnitude 2:",magnitude(vector_2))
print("Angle:", angle(vector_1,vector_2))

# Fx = F * cos(angle between)
Fx = magnitude(vector_2) * math.cos(angle(vector_1,vector_2))

print("Fx", Fx)

# projection of 2 onto 1
point = (sum(np.array(vector_1) * np.array(vector_2)) /
        magnitude(np.array(vector_1))**2) * np.array(vector_1)

print(point)

#  2 * 1               sum(np.array(vector_1) * np.array(vector_2))
#  -----  * 1                -------------------------------            *    np.array(vector_1)
#                                          mag(1)^2