import { StyleSheet } from "react-native";

export const header = StyleSheet.create({
  header: {
    paddingTop: 30,
    backgroundColor: "#ebebeb",
    flexDirection: "row",
  },

  headerText: {
    padding: 10,
    color: "#303030",
    fontSize: 30,
    fontWeight: "bold",
    flex: 2,
  },
});

export const card = StyleSheet.create({
  card: {
    borderRadius: 8,
    elevation: 3,
    backgroundColor: "white",
    marginHorizontal: 4,
    marginVertical: 6,
    alignSelf: "center",
  },

  impCard: {
    borderRadius: 8,
    elevation: 3,
    backgroundColor: "white",
    marginHorizontal: 4,
    marginVertical: 6,
    alignSelf: "center",
    borderLeftWidth: 4,
    borderLeftColor: "#ff5757",
  },

  cardContent: {
    marginHorizontal: 10,
    marginVertical: 10,
    flexDirection: "row",
    // width: 300,
  },

  todoItem: {
    marginLeft: 8,
    lineHeight: 25,
    fontSize: 16,
    color: "#303030",
    marginRight: 55,
  },
});

export const todos = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: "#ebebeb",
  },

  emptyTodosText: {
    color: "#303030",
    fontSize: 20,
    borderColor: "#fca944",
    backgroundColor: "white",
    borderWidth: 2,
    borderRadius: 15,
    alignSelf: "center",
    padding: 20,
    elevation: 3,
  },

  todoInput: {
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "#fca944",
    color: "black",
    padding: 10,
    fontSize: 18,
    borderRadius: 15,
    marginBottom: 10,
    width: "90%",
    alignSelf: "center",
    elevation: 1,
  },

  btn: {
    alignSelf: "center",
  },

  bottomPart: {
    paddingTop: 20,
    paddingBottom: 5,
    marginBottom: -10,
    alignSelf: "center",
    width: "110%",
  },
});
