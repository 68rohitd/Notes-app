import { StyleSheet } from "react-native";

export const darkheader = StyleSheet.create({
  header: {
    paddingTop: 30,
    backgroundColor: "#1c1c1c",
    flexDirection: "row",
  },

  headerText: {
    padding: 10,
    color: "white",
    fontSize: 30,
  },
});

export const darkcard = StyleSheet.create({
  card: {
    borderRadius: 8,
    elevation: 3,
    backgroundColor: "#141414",
    marginHorizontal: 4,
    marginVertical: 6,
    alignSelf: "center",
  },

  impCard: {
    borderRadius: 8,
    elevation: 3,
    backgroundColor: "#141414",
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
  },

  todoItem: {
    marginLeft: 8,
    lineHeight: 25,
    fontSize: 16,
    color: "white",
    marginRight: 55,
  },
});

export const darktodos = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: "#2b2b2b",
  },

  emptyTodosText: {
    color: "white",
    fontSize: 20,
    alignSelf: "center",
    padding: 20,
    elevation: 3,
    opacity: 0.4,
  },

  todoInput: {
    borderWidth: 2,
    borderColor: "#A3661C",
    color: "white",
    padding: 10,
    fontSize: 18,
    borderRadius: 15,
    marginBottom: 10,
    width: "90%",
    alignSelf: "center",
  },
});
