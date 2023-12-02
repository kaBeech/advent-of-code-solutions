program SolvePart2;
uses crt, sysutils;

function reverseString(const str: string): string;
var
  i, j: Integer;
begin
  j := length(str);
  setlength(reverseString, j);
  for i := 1 to j do
    reverseString[i] := str[j - i + 1];
end;

type
DigitStringArray = array[0..9] of string;

var
calibrationDocument: Text;
selectedCalibrationLine: string;
reversedCalibrationLine: string;
currentIndex: Integer;
selectedPosition: Integer;
selectedNumericPosition: Integer;
tensDigitLowestPosition: Integer;
onesDigitLowestPosition: Integer;
tensDigit: Integer;
onesDigit: Integer;
calibrationValue: Integer;
calibrationValueSum: Longint = 0;

const
digitStrings: DigitStringArray = ('zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine');
reversedDigitStrings: DigitStringArray = ('orez', 'eno', 'owt', 'eerht', 'ruof', 'evif', 'xis', 'neves', 'thgie', 'enin');
numericDigitStrings: DigitStringArray = ('0', '1', '2', '3', '4', '5', '6', '7', '8', '9');

begin
  assign(calibrationDocument, '../challengeInput.txt');
  reset(calibrationDocument);

  while not eof(calibrationDocument) do

  begin
    ReadLn(calibrationDocument, selectedCalibrationLine);

    begin
      currentIndex := 0;
        tensDigitLowestPosition := 9999;
        onesDigitLowestPosition := 9999;

      while currentIndex <= 9 do
        begin

          selectedPosition := pos(digitStrings[currentIndex],selectedCalibrationLine);
          selectedNumericPosition := pos(numericDigitStrings[currentIndex],selectedCalibrationLine);
          
          if (selectedNumericPosition < selectedPosition) and (selectedNumericPosition > 0) or (selectedPosition = 0) then
            selectedPosition := selectedNumericPosition;
          
          if (selectedPosition < tensDigitLowestPosition) and (selectedPosition > 0) then
          
            begin
              tensDigit := currentIndex * 10;
              tensDigitLowestPosition := selectedPosition;
            end;          

          reversedCalibrationLine := reverseString(selectedCalibrationLine);

          selectedPosition := pos(reversedDigitStrings[currentIndex],reversedCalibrationLine);
          selectedNumericPosition := pos(numericDigitStrings[currentIndex],reversedCalibrationLine);
          
          if (selectedNumericPosition < selectedPosition) and (selectedNumericPosition > 0) or (selectedPosition = 0) then
            selectedPosition := selectedNumericPosition;
          
          if (selectedPosition < onesDigitLowestPosition) and (selectedPosition > 0) then
          
            begin
              onesDigitLowestPosition := selectedPosition;
              onesDigit := currentIndex;
            end;
          
          currentIndex := currentIndex + 1;
          
        end;
    end;

    calibrationValue := tensDigit + onesDigit;
    calibrationValueSum := calibrationValueSum + calibrationValue;

  end;
   writeln(calibrationValueSum);
   readkey;
end. 