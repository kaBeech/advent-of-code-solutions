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
configurationDocument: Text;
selectedConfigurationLine: string;
reversedConfigurationLine: string;
currentIndex: Integer;
selectedPosition: Integer;
selectedNumericPosition: Integer;
tensDigitLowestPosition: Integer;
onesDigitLowestPosition: Integer;
tensDigit: Integer;
onesDigit: Integer;
configurationValue: Integer;
configurationValueSum: Longint = 0;

const
digitStrings: DigitStringArray = ('zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine');
reversedDigitStrings: DigitStringArray = ('orez', 'eno', 'owt', 'eerht', 'ruof', 'evif', 'xis', 'neves', 'thgie', 'enin');
numericDigitStrings: DigitStringArray = ('0', '1', '2', '3', '4', '5', '6', '7', '8', '9');

begin
  assign(configurationDocument, '../challengeInput.txt');
  reset(configurationDocument);

  while not eof(configurationDocument) do

  begin
    ReadLn(configurationDocument, selectedConfigurationLine);

    begin
      currentIndex := 0;
        tensDigitLowestPosition := 9999;
        onesDigitLowestPosition := 9999;

      while currentIndex <= 9 do
        begin

          selectedPosition := pos(digitStrings[currentIndex],selectedConfigurationLine);
          selectedNumericPosition := pos(numericDigitStrings[currentIndex],selectedConfigurationLine);
          
          if (selectedNumericPosition < selectedPosition) and (selectedNumericPosition > 0) or (selectedPosition = 0) then
            selectedPosition := selectedNumericPosition;
          
          if (selectedPosition < tensDigitLowestPosition) and (selectedPosition > 0) then
          
            begin
              tensDigit := currentIndex * 10;
              tensDigitLowestPosition := selectedPosition;
            end;          

          reversedConfigurationLine := reverseString(selectedConfigurationLine);

          selectedPosition := pos(reversedDigitStrings[currentIndex],reversedConfigurationLine);
          selectedNumericPosition := pos(numericDigitStrings[currentIndex],reversedConfigurationLine);
          
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

    configurationValue := tensDigit + onesDigit;
    configurationValueSum := configurationValueSum + configurationValue;

  end;
   writeln(configurationValueSum);
   readkey;
end. 