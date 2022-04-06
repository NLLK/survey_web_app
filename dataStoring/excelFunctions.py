from traceback import print_tb
from dataStoring.models import DataStorage
from django_project.settings import MEDIA_ROOT
import xlsxwriter
import json


class ExcelFunctions():
    a = 0

    @staticmethod
    def RemoveSpecialSymbols(string):
        return ''.join(c for c in string if c not in '?:!/;')

    @staticmethod
    def getCollumnNamesFromQuestion(question):
        array = []
        for q in question['answersList']:  # foreach subquestion in question
            if q['isQuestion'] != True:  # if it is not a
                array.append(q['id']['string'])
            else:
                array.append(q['id']['string'])
                array.extend(ExcelFunctions.getCollumnNamesFromQuestion(q))

        return array

    @staticmethod
    def getCollumnNamesFromQuestionnaire(questionnaire):
        fields = json.loads(questionnaire)

        array = []

        for question in fields:  # foreach question in questionnaire
            print(question['text'])
            array.extend(ExcelFunctions.getCollumnNamesFromQuestion(question))

        return array

    @staticmethod
    def CreateExcel(fileName, questionnaireFields):
        filePath = MEDIA_ROOT+"/"+fileName+".xlsx"
        workbook = xlsxwriter.Workbook(filePath)
        worksheet = workbook.add_worksheet()

        collumns = ExcelFunctions.getCollumnNamesFromQuestionnaire(
            questionnaireFields)

        index = 0
        for col in collumns:
            worksheet.write(0, index, col)
            index += 1

        rowNumber = 1

        for row in DataStorage.objects.all():
            print(row.data)
            data = json.loads(row.data.replace('\'', '\"'))
            index = 0
            for info in data:
                worksheet.write(rowNumber, index, info['data'])
                index += 1
            rowNumber += 1

        workbook.close()

        return filePath
